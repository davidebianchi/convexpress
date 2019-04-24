const { join } = require("path");

const IS_DEPLOYING_MAIN_WEBSITE = process.env.DEPLOY_MAIN_WEBSITE === "true";
const IS_GIT_TAG = !!process.env.CIRCLE_TAG;
const BUNDLE_TAG = IS_GIT_TAG
    ? process.env.CIRCLE_TAG
    : process.env.CIRCLE_BRANCH;

module.exports = {
    bundle: {
        from: join(__dirname, "/docs/.vuepress/dist"),
        name: "convexpress",
        tag: BUNDLE_TAG,
        description: `Bundle for commit ${process.env.CIRCLE_SHA1}`,
        fallbackAssetPath: "/404.html",
        fallbackStatusCode: 404,
        headers: {
            "**/*": {
                "Cache-Control": "public, max-age=86400"
            }
        }
    },
    deploy: {
        app: "convexpress",
        entrypoint: IS_GIT_TAG
            ? IS_DEPLOYING_MAIN_WEBSITE
                ? "convexpress.staticdeploy.io/"
                : `convexpress.staticdeploy.io/${BUNDLE_TAG}/`
            : `convexpress.staticdeploy.io/_/${BUNDLE_TAG}/`,
        bundle: `convexpress:${BUNDLE_TAG}`
    }
};
