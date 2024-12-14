import { Q as Qe, u as urlBuilder } from './functions-db2a5912.js';

const availableReactions = {
    like: {
        className: ["fa-star", "has-text-warning"],
    },
    repost: {
        className: ["fa-retweet", "has-text-success"],
    },
    reply: {
        className: ["fa-comment-dots", "has-text-text"],
    },
    mention: {
        className: ["fa-quote-right", "has-text-text"],
        filter: "mention-of",
    },
};

function twitterLink(rawPostUrl) {
    const postUrl = new URL(rawPostUrl);
    const author = (document.head.querySelector("meta[name='author']")).content;
    return urlBuilder("https://twitter.com/intent/tweet", {
        original_referer: `${postUrl.origin}`,
        text: document.title,
        url: postUrl.href,
        via: author,
    }).toString();
}
function getMentionsUrl(props) {
    return urlBuilder(`${props.apiUrl}/mentions.html`, {
        target: props.postUrl,
        "wm-property": props?.filter,
    }).toString();
}
function Reactions(props) {
    const apiUrl = "https://webmention.io/api";
    async function fetchReactions() {
        const fetchedReactions = (await (await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)).json());
        this.reactions = Object.entries(availableReactions).map(([type, reactionData]) => {
            const count = fetchedReactions.type?.[type] || 0;
            if (reactionData.filter && count) {
                this.mentions.count = count;
                return null;
            }
            return {
                count: count,
                name: type,
                className: [...reactionData.className, "fa", "ml-3", "mr-2"],
            };
        });
    }
    const reactions = [];
    return {
        reactions,
        mentions: {
            count: 0,
            url: getMentionsUrl({
                apiUrl,
                postUrl: props?.postUrl,
                filter: availableReactions.mention.filter,
            }),
        },
        fetchReactions,
    };
}
const mountApp = () => Qe({ twitterLink, Reactions }).mount("#reactions");
document.addEventListener("DOMContentLoaded", mountApp);
//# sourceMappingURL=post.js.map
