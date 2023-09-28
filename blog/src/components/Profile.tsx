import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const Profile = () => {
	const onSignOut = async () => {
		try {
			const auth = getAuth(app);
			await signOut(auth);
			toast.success("로그아웃 되었습니다.");
		} catch (error: any) {
			console.log(error);
			toast.error("로그아웃에 실패하였습니다.");
		}
	};
	return (
		<div className='profile__box'>
			<div className='flex__box-lg'>
				<div className='profile__image' />
				<div>
					<div className='profile__email'>test@test.com</div>
					<div className='profile__name'>김유저</div>
				</div>
			</div>
			<div role='presentation' className='profile__logout' onClick={onSignOut}>
				로그아웃
			</div>
		</div>
	);
};

export default Profile;
