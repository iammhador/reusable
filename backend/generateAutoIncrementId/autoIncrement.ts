export const generateId = async (
  prismaModel: any,
  filterName: string,
  fieldName: string,
  incrementName: string,
  businessId: number
) => {
  // Fetch all records that start with the incrementName and sort them by fieldName in descending order
  const itemCode = await prismaModel.findMany({
    where: {
      bizid: businessId,
      [fieldName]: {
        startsWith: incrementName, // Filter items starting with incrementName
      },
    },
    orderBy: {
      [filterName]: "desc",
    },
    select: {
      [fieldName]: true,
    },
    take: 1, // Get only the top record
  });

  let newItemCode: string;

  if (itemCode.length === 0) {
    // If no existing records, start with the incrementName followed by 1
    newItemCode = `${incrementName}1`;
  } else {
    // Extract the numeric part from the highest value using a regular expression
    const regex = new RegExp(`^${incrementName}(\\d+)$`);
    const match = itemCode[0][fieldName].match(regex);

    if (match) {
      // Extract the numeric part and increment it
      const highestFieldValue = parseInt(match[1], 10);
      const incrementedFieldValue = highestFieldValue + 1;
      newItemCode = `${incrementName}${incrementedFieldValue}`; // Concatenate incrementName with incremented value
    } else {
      // Fallback in case the format is unexpected
      throw new Error("Invalid format in existing item codes");
    }
  }

  return newItemCode;
};

export const generateAutoIncrement = async (
  prismaModel: any,
  fieldName: string,
  incrementName: string,
  businessId: number
) => {
  // Fetch all records that start with the incrementName and sort them by fieldName in descending order
  const itemCode = await prismaModel.findMany({
    where: {
      bizid: businessId,
      // [fieldName]: {
      //   startsWith: incrementName, // Filter items starting with incrementName
      // },
    },
    orderBy: {
      [fieldName]: "desc",
    },
    select: {
      [fieldName]: true,
    },
  });

  let newItemCode: string;

  if (itemCode.length === 0) {
    // If no existing records, start with the incrementName followed by 1
    newItemCode = `${incrementName}1`;
  } else {
    // Extract the numeric part from the highest value
    const highestFieldValue = parseInt(
      itemCode[0][fieldName].replace(incrementName, ""),
      10
    );

    // Increment the numeric part using BigInt to prevent overflow
    const incrementedFieldValue = BigInt(highestFieldValue + 1);
    newItemCode = `${incrementName}${incrementedFieldValue.toString()}`;
  }

  return newItemCode;
};
