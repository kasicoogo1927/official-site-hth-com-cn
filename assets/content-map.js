// assets/content-map.js

const contentSections = [
  {
    id: "home",
    title: "首页概览",
    tags: ["华体会", "首页", "推荐"],
    content: "华体会官方站点首页，提供最新活动和资讯。"
  },
  {
    id: "about",
    title: "关于我们",
    tags: ["华体会", "公司介绍", "品牌"],
    content: "华体会致力于为用户提供优质的线上服务体验。"
  },
  {
    id: "services",
    title: "服务项目",
    tags: ["华体会", "服务", "解决方案"],
    content: "华体会提供多元化的在线服务与技术支持。"
  },
  {
    id: "contact",
    title: "联系方式",
    tags: ["华体会", "联系", "客服"],
    content: "如有任何问题，请通过官方渠道联系华体会客服。"
  },
  {
    id: "faq",
    title: "常见问题",
    tags: ["华体会", "FAQ", "帮助"],
    content: "华体会常见问题解答，帮助用户快速解决问题。"
  }
];

const keywordIndex = {};

function buildKeywordIndex() {
  contentSections.forEach(section => {
    const allWords = [...section.tags, ...section.title.split(""), ...section.content.split("")];
    allWords.forEach(word => {
      const trimmed = word.trim().toLowerCase();
      if (trimmed.length === 0) return;
      if (!keywordIndex[trimmed]) {
        keywordIndex[trimmed] = [];
      }
      if (!keywordIndex[trimmed].includes(section.id)) {
        keywordIndex[trimmed].push(section.id);
      }
    });
  });
}

buildKeywordIndex();

function searchContent(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (keywordIndex[lowerQuery]) {
    return keywordIndex[lowerQuery].map(id => contentSections.find(s => s.id === id)).filter(Boolean);
  }
  // fallback: partial match on tags and title
  return contentSections.filter(section => {
    const combined = [...section.tags, section.title, section.content].join(" ").toLowerCase();
    return combined.includes(lowerQuery);
  });
}

// Example usage (uncomment to test)
// console.log(searchContent("华体会"));
// console.log(searchContent("服务"));

// Site-wide reference
const siteUrl = "https://official-site-hth.com.cn";

function getSectionUrl(sectionId) {
  return `${siteUrl}/${sectionId}`;
}

// Export or expose for other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { contentSections, keywordIndex, searchContent, getSectionUrl, siteUrl };
}