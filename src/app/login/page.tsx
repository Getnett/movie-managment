import Login from "../components/login";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div>
        <h1 className="text-center mb-8 text-[64px]">Sign In</h1>
        <Login />
      </div>
    </div>
  );
};
export default LoginPage;
