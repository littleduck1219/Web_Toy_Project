import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "type";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";

const PostDetail = () => {
	const params = useParams();
	const [post, setPost] = useState<PostProps | null>(null);
	const navigate = useNavigate();

	const getPost = async (id: string) => {
		if (id) {
			const docRef = doc(db, "posts", id);
			const docSnap = await getDoc(docRef);

			setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
		}
	};

	const handleDelete = async () => {
		const confirm = window.confirm("정말로 게시글을 삭제 할까요?");
		if (confirm && post && post.id) {
			await deleteDoc(doc(db, "posts", post.id));
			toast.success("삭제완료");
			navigate("/");
		}
	};

	const handleEdit = () => {};

	useEffect(() => {
		if (params?.id) getPost(params?.id);
	}, [params?.id, post]);

	return (
		<>
			<Header />
			<div className='post__detail'>
				{post ? (
					<div className='post__box'>
						<div className='post__title'>{post?.title}</div>
						<div className='post__profile-box'>
							<div className='post__profile' />
							<div className='post__author-name'>{post?.email}</div>
							<div className='post__date'>{post?.createdAt}</div>
						</div>
						<div className='post__utils-box'>
							<div className='post__delete' role='presentation' onClick={handleDelete}>
								삭제
							</div>
							<div className='post__edit'>
								<Link to={`/posts/edit/${post?.id}`} onClick={handleEdit}>
									수정
								</Link>
							</div>
						</div>
						<div className='post__text post__text--pre-wrap'>{post?.content}</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
			<Footer />
		</>
	);
};

export default PostDetail;
