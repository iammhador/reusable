"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbLoaderQuarter } from "react-icons/tb";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const VerifyPage = ({ params }: { params: { id: string[] } }) => {
  const [mailFromLocal, setmailFromLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [vcode, setVcode] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/backend/users/verify-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vcode: vcode.join(""), email: mailFromLocal }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      }
      if (data.result) {
        toast.success("Email verified successfully. You can now log in.");
        router.push("/login");
      }
    } catch (error) {
      // console.error("Error verifying:", error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    // Handle backspace
    if (!value && vcode[index]) {
      const newVcode = [...vcode];
      newVcode[index] = "";
      setVcode(newVcode);

      if (index > 0) {
        document.getElementById(`vcode-${index - 1}`)?.focus();
      }
      return;
    }

    // Handle forward input
    if (value.length <= 1) {
      const newVcode = [...vcode];
      newVcode[index] = value;
      setVcode(newVcode);

      if (value && index < vcode.length - 1) {
        document.getElementById(`vcode-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !vcode[index] && index > 0) {
      document.getElementById(`vcode-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    setVcode(pasteData);
  };

  useEffect(() => {
    if (params?.id[0]) {
      const decodedEmail = decodeURIComponent(params?.id[0]);
      setmailFromLocal(decodedEmail);
    }
  }, [params?.id]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] px-4 py-6">
      <main className="bg-[#e9ecef] border border-gray-300 shadow-lg rounded-lg w-full max-w-md p-8 relative">
        <div className="flex flex-col items-center gap-4">
          <FaEnvelope className="text-6xl text-[#344955] border-4 border-[#344955] p-2 rounded-full" />
          <h1 className="text-2xl font-semibold text-[#222831]">
            Verify Your Email
          </h1>
          <p className="text-sm text-[#3a3a3a] text-center">
            Enter the code sent to <b>{mailFromLocal}</b> to verify your
            account.
          </p>
          <div className="flex items-center justify-center gap-2 w-full">
            {vcode.map((digit, idx) => (
              <input
                key={idx}
                id={`vcode-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-[#344955] focus:ring-2 focus:ring-[#344955] transition"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            disabled={isLoading}
            onClick={handleVerify}
            className="w-full mt-6 bg-[#344955] text-white font-medium py-2 rounded-md hover:bg-[#222831] transition focus:outline-none focus:ring-2 focus:ring-[#344955] focus:ring-offset-2"
          >
            {isLoading ? (
              <TbLoaderQuarter className="w-6 h-6 animate-spin m-auto" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FaCheckCircle />
                Verify
              </span>
            )}
          </button>
        </div>
      </main>
    </section>
  );
};

export default VerifyPage;
