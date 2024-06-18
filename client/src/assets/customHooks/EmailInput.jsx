import useWindowWidth from "./useWindowWidth"; // Adjust the import path as needed

const EmailInput = () => {
  const windowWidth = useWindowWidth();

  const placeholderText = windowWidth < 400 ? "join our newsletter" : "your email";

  return (
    <input type="email" placeholder={placeholderText} />
  );
};

export default EmailInput;
