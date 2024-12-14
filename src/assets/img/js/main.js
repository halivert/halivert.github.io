import { v as vibrate, Q as Qe, i as isInput } from './functions-db2a5912.js';
import { SearchModal, SearchResult } from './search.js';

function modalKeyHandler(evt) {
    if (!document.getElementById("search-modal"))
        return;
    if (!isInput(evt.target.nodeName)) {
        if (evt.key === "/") {
            evt.preventDefault();
            return window?.toggleSearchModal(true);
        }
    }
    if (evt.key === "Escape" || evt.key === "Esc") {
        evt.preventDefault();
        return window?.toggleSearchModal(false);
    }
}
function Menu() {
    return {
        activeMenuItem: window.location.href,
        itemIsActive(el) {
            return this.activeMenuItem === el.href;
        },
    };
}
const mountApp = () => {
    function toggleSearchModal(force) {
        if (force != undefined)
            this.activeSearchModal = force;
        else
            this.activeSearchModal = !this.activeSearchModal;
    }
    return Qe({
        Menu,
        SearchModal,
        SearchResult,
        activeSearchModal: false,
        searchInput: null,
        mountSearchModal() {
            window.toggleSearchModal = toggleSearchModal.bind(this);
            document.addEventListener("keydown", modalKeyHandler);
        },
    }).mount("#side-menu-container");
};
window.vibrate = vibrate;
document.addEventListener("DOMContentLoaded", mountApp);
//# sourceMappingURL=main.js.map
