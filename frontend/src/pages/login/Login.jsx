const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Login to <span className="text-sky-500">Manga Mingle App</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-sky-500 mt-2 inline-block"
          >
            {"Don't"} have an account ?
          </a>

          <div>
            <button className="btn btn-outline hover:bg-sky-500 btn-sm btn-block mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
