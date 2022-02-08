"use strict";
class Dom {
    constructor(selector) {
        this.elements = Dom.getSelector(selector);
        this.element = this.get();
        return this;
    }
    /**
     * @description 获取元素
     * @static
     * @param {string} selector
     * @return {*}  {Element[]}
     * @memberof Dom
     */
    static getSelector(selector) {
        const idRegex = /^#(?:[\w-]|\\.|[^\x20-\xa0])*$/;
        if (idRegex.test(selector)) {
            const el = document.getElementById(selector.substring(1));
            return el ? [el] : [];
        }
        return [].slice.call(document.querySelectorAll(selector) || []);
    }
    /**
     * @description 获取元素
     * @param {number} [index=0]
     * @return {*}  {Element}
     * @memberof Dom
     */
    get(index = 0) {
        return this.elements[index];
    }
    /**
     * @description 遍历元素
     * @param {() => void} func
     * @return {*}  {Dom}
     * @memberof Dom
     */
    each(func) {
        this.elements.forEach((el) => {
            func(el);
        });
        return this;
    }
    /**
     * @description 添加class
     * @param {string} [classNames=""]
     * @return {*}  {Dom}
     * @memberof Dom
     */
    addClass(classNames = "") {
        this.each((el) => {
            classNames.split(" ").forEach((className) => {
                className && el.classList.add(className);
            });
        });
        return this;
    }
    /**
     * @description 获取/设置 innerHTML
     * @param {string} html
     * @return {*}  {(string | undefined | Dom)}
     * @memberof Dom
     */
    html(html) {
        if (html === undefined) {
            if (!this.element) {
                return undefined;
            }
            return this.element.innerHTML;
        }
        this.each((el) => {
            el.innerHTML = html;
        });
        return this;
    }
    /**
     * @description  获取/设置 value
     * @param {string} value
     * @return {*}  {(string | undefined | Dom)}
     * @memberof Dom
     */
    val(value) {
        if (value === undefined) {
            if (!this.element) {
                return undefined;
            }
            return this.element.value;
        }
        this.each((el) => {
            el.value = value;
        });
        return this;
    }
    /**
     * @description 添加点击事件
     * @param {() => void} func
     * @return {*}
     * @memberof Dom
     */
    click(func) {
        this.each((el) => {
            el.addEventListener("click", func, false);
        });
        return this;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const $ry = (selector) => {
    return new Dom(selector);
};
