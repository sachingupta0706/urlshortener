import crypto from "crypto";
import {
  getAllShortLinks,
  getShortLinkByShortCode,
  createShortLinkService,
} from "../services/shortener.services.js";

export const getShortenerPage = async (req, res) => {
  try {
    const links = await getAllShortLinks();

    // let isLoggedIn = req.headers.cookie;
    // isLoggedIn = Boolean(
    //   isLoggedIn
    //   ?.split(";")
    //   ?.find((cookie) => cookie.trim().startsWith("isLoggedIn"))
    //   ?.split("=")[1]
    // );
    // console.log( isLoggedIn);

    let isLoggedIn = req.cookies.isLoggedIn;


    const origin = `${req.protocol}://${req.get("host")}`;
    res.render("index", { links, origin, isLoggedIn });
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).send("Server error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const rawUrl = (req.body.url || "").trim();
    let shortCode = (req.body.shortCode || "").trim();

    if (!rawUrl) return res.status(400).send("URL is required");

    try {
      new URL(rawUrl);
    } catch {
      return res.status(400).send("Invalid URL");
    }

    if (!shortCode) {
      shortCode = crypto.randomBytes(4).toString("hex");
    } else {
      shortCode = shortCode.replace(/\s+/g, "-");
    }

    const exists = await getShortLinkByShortCode(shortCode);
    if (exists) return res.status(409).send("Short code already exists");

    await createShortLinkService({ rawUrl, shortCode });

    res.redirect("/");
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).send("Server error");
  }
};



export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getShortLinkByShortCode(shortCode);

    if (!link) {

      return res.status(404).render("404", { message: "Short link not found" });
    }

    return res.redirect(link.rawUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server error");
  }
};

