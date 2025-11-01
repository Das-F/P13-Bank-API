import icon from "../assets/img/circle-user-solid-full.svg";

function LoginForm({ handleSubmit }) {
  return (
    <section className="sign-in-content">
      <div className="sign-in-box">
        <img className="nav-user-icon" src={icon} alt="User Icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username" className="form-text">
              Username
            </label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" className="form-text">
              Password
            </label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">
              <h4>Remember me</h4>
            </label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
