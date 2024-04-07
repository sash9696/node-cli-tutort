import authService from "../services/authServices.js";

const authController = {
  async signup(req, res) {
    const { username, password } = req.body;

    try {
      const user = await authService.signup(username, password);
      const newUser = {};
      newUser.username = user.username;
      newUser.id = user._id;

      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  async login (req, res){
    const { username, password } = req.body;

    try {
      //find the user in database
        const token = await authService.login(username, password);
        console.log('authController',token)
      return res.status(200).json({
          token
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error
      });
    }
  }
};

export default authController;
