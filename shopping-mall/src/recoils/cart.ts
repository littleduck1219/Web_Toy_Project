import { RecoilState, atom, selectorFamily } from "recoil";

let cartState: RecoilState<Map<string, number>> | null = null;

if (!cartState) {
	cartState = atom({
		key: "cartState",
		default: new Map(),
	});
}

export const cartItemSelector = selectorFamily<number | undefined, string>({
	key: "cartItem",
	get:
		(id: string) =>
		({ get }) => {
			if (cartState) {
				const carts = get(cartState);
				return carts.get(id);
			}
		},
	set:
		(id: string) =>
		({ get, set }, newValue) => {
			console.log(newValue);
			if (typeof newValue === "number") {
				if (cartState) {
					const newCart = new Map([...get(cartState)]);
					newCart.set(id, newValue);
					set(cartState, newCart);
				}
			}
		},
});
