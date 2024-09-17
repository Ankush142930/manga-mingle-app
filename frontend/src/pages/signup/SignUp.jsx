import { Link } from 'react-router-dom';
import GenderCheckBox from './GenderCheckBox';
import { useState } from 'react';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = useSignUp();

  //Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(inputs);
  };

  //Handling Gender checkbox submission
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <img
          src="../../../../public/inu.png"
          alt=""
          className="w-12 h-12 mx-auto rounded"
        />

        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Sign up to <span className=" text-sky-500">Manga Mingle App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              type="text"
              placeholder="theFunniestDoeEver123"
              className="input input-bordered w-full h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password to confirm"
              className="input input-bordered w-full h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckBox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-sky-500 mt-2 inline-block"
          >
            Already have an account ?
          </Link>

          <div>
            {!loading ? (
              <button className="btn btn-outline hover:bg-sky-500 btn-sm btn-block mt-2">
                Create Account
              </button>
            ) : (
              <span className="loading loading-spinner mx-auto"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
