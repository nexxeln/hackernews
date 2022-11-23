import { withProtected } from "~/layouts/Protected";

const MyPage = withProtected((props) => {
  return <h1>{props.user.displayName}</h1>;
});

export const routeData = MyPage.routeData;
export default MyPage.Page;
