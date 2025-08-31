import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });

import { useState } from "react";

export const Page = () => {
  const [conversations, setConversations] = useState<
    Array<{ user: string; bot: string; createdAt: string }>
  >([]);

  const [text, setText] = useState("");

  const sendMessage = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: { text },
    });

    setConversations([
      ...conversations,
      {
        createdAt: new Date().toISOString(),
        user: text,
        bot: response.text ?? "오류가 발생했어요.",
      },
    ]);
    setText("");
  };

  return (
    <main className="w-dvw  overflow-x-hidden">
      <div className="h-dvh m-auto max-w-[600px]  bg-gray-50">
        <div className="sticky top-0 border-none bg-white mb-[10px]">
          <h3 className="text-center text-3xl font-bold p-4">Jamini</h3>
        </div>
        <div className="bg-gray-50 px-[16px]">
          <div>
            {conversations.map((item, idx, self) => (
              <div
                key={item.createdAt}
                className={self.length - 1 === idx ? "mb-[40px]" : ""}
              >
                <div className="flex justify-start mb-[10px]">
                  <div className="text-sm text-gray-500 bg-white p-2 rounded-md max-w-[80%]">
                    나 : {item.user}
                  </div>
                </div>
                <div className="flex justify-end mb-[10px]">
                  <div className="text-sm text-gray-500 bg-white p-2 rounded-md max-w-[80%]">
                    Jamini : {item.bot}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-[5px] border p-2 m-auto rounded-2xl w-full bg-white">
            <textarea
              className="p-2 border-none focus:ring-0 focus:outline-none block resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              cols={50}
            ></textarea>
            <button
              className="m-auto text-white bg-blue-600 p-2 rounded-md "
              onClick={sendMessage}
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
