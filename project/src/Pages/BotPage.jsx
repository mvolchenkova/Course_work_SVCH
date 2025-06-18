import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../slices/chatSlice";
import Footer from "../Components/Footer/Footer";
import HeaderLog from "../Components/HeaderLog/HeaderLog";

export default function BotPage() {
    const [userInput, setUserInput] = useState("");
    const dispatch = useDispatch();
    const response = useSelector((state) => state.chat.response);
    const status = useSelector((state) => state.chat.status);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(sendMessage(userInput));
        setUserInput("");
    };

    return (
        <>
            <HeaderLog />
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Введите ваше сообщение"
                    />
                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
                <div>
                    <h2>Ответ AI:</h2>
                    <p>{response}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}