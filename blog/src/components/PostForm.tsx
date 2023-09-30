import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = () => {
	const [title, setTitle] = useState<string>("");
	const [summary, setSummary] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await addDoc(collection(db, "posts"), {
				title,
				summary,
				content,
				createdAt: new Date()?.toLocaleDateString(),
				email: user?.email,
			});
			navigate("/");
			toast?.success("게시글을 생성했습니다.");
		} catch (e: any) {
			console.log(e);
			toast?.success("게시글을 생성실패했습니다.");
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "title") {
			setTitle(value);
		}
		if (name === "summary") {
			setSummary(value);
		}
		if (name === "content") {
			setContent(value);
		}
	};

	return (
		<form className='form' onSubmit={onSubmit}>
			<div className='form__block'>
				<label htmlFor='title'>제목</label>
				<input type='text' name='title' id='title' required value={title} onChange={onChange} />
			</div>
			<div className='form__block'>
				<label htmlFor='summary'>요약</label>
				<input type='text' name='summary' id='summary' required value={summary} onChange={onChange} />
			</div>
			<div className='form__block'>
				<label htmlFor='content'>내용</label>
				<textarea name='content' id='content' required value={content} onChange={onChange} />
			</div>
			<div className='form__block'>
				<input type='submit' value='제출' className='form__btn--submit' />
			</div>
		</form>
	);
};

export default PostForm;
