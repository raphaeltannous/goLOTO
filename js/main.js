import {
	menuInit
} from "./menu.js";
import {
	progressBarInit
} from "./progress_bar.js";
import {
	collapsibleInit
} from "./collapsible.js";
import {
	navspyInit
} from "./navspy.js";
document.addEventListener("DOMContentLoaded", () => {
	menuInit();
	collapsibleInit();
	navspyInit();
	progressBarInit();
});
