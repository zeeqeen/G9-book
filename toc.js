// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="STANDARD.html">G9 项目流程标准</a></li><li class="chapter-item expanded affix "><li class="part-title">Idea</li><li class="chapter-item expanded "><a href="design.html"><strong aria-hidden="true">1.</strong> 设计原则</a></li><li class="chapter-item expanded "><a href="idea/idea.html"><strong aria-hidden="true">2.</strong> Idea lists</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="idea/ch1.html"><strong aria-hidden="true">2.1.</strong> 打砖块</a></li><li class="chapter-item expanded "><a href="idea/ch2.html"><strong aria-hidden="true">2.2.</strong> 汽车泡泡</a></li><li class="chapter-item expanded "><a href="idea/ch3.html"><strong aria-hidden="true">2.3.</strong> 锯木块/切橡皮</a></li><li class="chapter-item expanded "><a href="idea/ch4.html"><strong aria-hidden="true">2.4.</strong> 雷霆战机</a></li><li class="chapter-item expanded "><a href="idea/ch5.html"><strong aria-hidden="true">2.5.</strong> 黑洞攻击</a></li><li class="chapter-item expanded "><a href="idea/ch6.html"><strong aria-hidden="true">2.6.</strong> 跳一跳类型参考</a></li><li class="chapter-item expanded "><a href="idea/ch7.html"><strong aria-hidden="true">2.7.</strong> 欢乐球球参考</a></li><li class="chapter-item expanded "><a href="idea/ch8.html"><strong aria-hidden="true">2.8.</strong> 祖玛塔防</a></li><li class="chapter-item expanded "><a href="idea/ch9.html"><strong aria-hidden="true">2.9.</strong> 抓大鹅</a></li><li class="chapter-item expanded "><a href="idea/ch10.html"><strong aria-hidden="true">2.10.</strong> 洗地板模拟器</a></li><li class="chapter-item expanded "><a href="idea/ch11.html"><strong aria-hidden="true">2.11.</strong> 像素游戏冒险岛再发明</a></li><li class="chapter-item expanded "><a href="idea/ch12.html"><strong aria-hidden="true">2.12.</strong> 吃掉落物</a></li><li class="chapter-item expanded "><a href="idea/ch13.html"><strong aria-hidden="true">2.13.</strong> 塔防大富翁杂交版</a></li><li class="chapter-item expanded "><a href="idea/ch14.html"><strong aria-hidden="true">2.14.</strong> 神枪手</a></li><li class="chapter-item expanded "><a href="idea/ch15.html"><strong aria-hidden="true">2.15.</strong> Flip Wall</a></li><li class="chapter-item expanded "><a href="idea/ch16.html"><strong aria-hidden="true">2.16.</strong> 神枪手</a></li><li class="chapter-item expanded "><a href="idea/ch17.html"><strong aria-hidden="true">2.17.</strong> 17</a></li><li class="chapter-item expanded "><a href="idea/ch18.html"><strong aria-hidden="true">2.18.</strong> 18</a></li><li class="chapter-item expanded "><a href="idea/ch19.html"><strong aria-hidden="true">2.19.</strong> 19</a></li><li class="chapter-item expanded "><a href="idea/ch20.html"><strong aria-hidden="true">2.20.</strong> 20</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">开发</li><li class="chapter-item expanded "><a href="dev/engine.html"><strong aria-hidden="true">3.</strong> 游戏引擎</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="dev/bevy-engine.html"><strong aria-hidden="true">3.1.</strong> Bevy</a></li><li class="chapter-item expanded "><a href="dev/cocos-engine.html"><strong aria-hidden="true">3.2.</strong> Cocos</a></li><li class="chapter-item expanded "><a href="dev/godot-engine.html"><strong aria-hidden="true">3.3.</strong> Godot</a></li><li class="chapter-item expanded "><a href="dev/unity-engine.html"><strong aria-hidden="true">3.4.</strong> Unity</a></li></ol></li><li class="chapter-item expanded "><a href="android/android.html"><strong aria-hidden="true">4.</strong> 安卓</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="android/ad.html"><strong aria-hidden="true">4.1.</strong> 广告集成</a></li><li class="chapter-item expanded "><a href="android/android-api.html"><strong aria-hidden="true">4.2.</strong> 谷歌 API</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">静态资源</li><li class="chapter-item expanded affix "><li class="part-title">数据分析</li><li class="chapter-item expanded affix "><li class="part-title">发行和对外商务</li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="REFERENCE.html">参考</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
