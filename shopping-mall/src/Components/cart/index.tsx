import { CartType } from "../../graphqlType";
import { CartItem } from "./item";

export const CartList = ({ items }: { items: CartType[] }) => {
	return (
		<ul className='cart'>
			{items.map((item) => (
				<CartItem {...item} key={item.id} />
			))}
		</ul>
	);
};
