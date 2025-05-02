import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "Java八股文",
        icon: "eight",
        link: "/home.md",
    },
    {
        text: "算法",
        icon: "algo",
        link: "/algo/",
    },
    {
        text: "工具",
        icon: "tool",
        link: "/tool/",
    },
    {
        text: "程序员情商课",
        icon: "eq",
        link: "/eq/",
    },
    {
        text: "关于",
        icon: "about",
        link: "/about/",
    },
]);
