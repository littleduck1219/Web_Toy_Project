import React, { useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryType, PostProps } from "type";
import { CATEGORIES } from "./PostList";

const PostForm = () => {
	const params = useParams();
	const [post, setPost] = useState<PostProps | null>(null);
	const [title, setTitle] = useState<string>("");
	const [summary, setSummary] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [category, setCategory] = useState<CategoryType | string>("");
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const getPost = async (id: string) => {
		if (id) {
			const docRef = doc(db, "posts", id);
			const docSnap = await getDoc(docRef);

			setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "title") setTitle(value);
		if (name === "summary") setSummary(value);
		if (name === "content") setContent(value);
		if (name === "category") setCategory(value);
	};

	useEffect(() => {
		if (params?.id) getPost(params?.id);
	}, [params?.id]);

	useEffect(() => {
		if (post) {
			setTitle(post?.title);
			setSummary(post?.summary);
			setContent(post?.content);
			setCategory(post?.category as CategoryType);
		}
	}, [post]);
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (post && post.id) {
				// post 값이 있다면 firestore로 데이터 수정
				const postRef = doc(db, "posts", post?.id);
				await updateDoc(postRef, {
					title,
					summary,
					category,
					content,
					updatedAt: new Date()?.toLocaleDateString("ko", {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					}),
				});

				navigate("/");
				toast?.success("게시글을 수정했습니다.");
			} else {
				// firestore로 데이터 생성
				await addDoc(collection(db, "posts"), {
					title,
					summary,
					category,
					content,
					createdAt: new Date()?.toLocaleDateString("ko", {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					}),
					email: user?.email,
					uid: user?.uid,
				});
				toast?.success("게시글을 생성했습니다.");
				navigate("/");
			}
		} catch (e: any) {
			console.log(e);
			toast?.success("게시글을 생성실패했습니다.");
		}
	};

	return (
		<form className='form' onSubmit={onSubmit}>
			<div className='form__block'>
				<label htmlFor='title'>제목</label>
				<input type='text' name='title' id='title' required value={title} onChange={onChange} />
			</div>
			<div className='form__block'>
				<label htmlFor='category'>카테고리</label>
				<select name='category' id='category' onChange={onChange} defaultValue={category}>
					<option value=''>카테고리를 선택해주세요</option>
					{CATEGORIES?.map((category) => (
						<option value={category} key={category}>
							{category}
						</option>
					))}
				</select>
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
				<input type='submit' value={post ? "수정" : "제출"} className='form__btn--submit' />
			</div>
		</form>
	);
};

export default PostForm;
