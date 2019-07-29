

export default (req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if(!isAdmin) return res.status(403).send("only for admin.");
    next();
}