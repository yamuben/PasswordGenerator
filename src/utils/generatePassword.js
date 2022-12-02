import generator from "generate-password-browser";

export const generateDefaultPassword = (pswdProperties) => {
  console.log("********************************");
  var passwords = generator.generate(pswdProperties);

  console.log(">>>>>", passwords);
  return passwords;
};

// generateDefaultPassword();
// export default generateDefaultPassword;
