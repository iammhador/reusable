const xinvnum = await generateId(
  prisma.somst, // prisma model
  "somstid", // filter name
  "xinvnum", // field name
  `${findBusiness?.xshort?.slice(0, 10).toUpperCase()}-INV`, // increment name
  bizid // business id
);
