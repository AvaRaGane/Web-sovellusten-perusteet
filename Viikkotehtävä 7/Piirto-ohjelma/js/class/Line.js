import { Shape } from "./Shape.js"

export class Line extends Shape{
    #x2
    #y2

    constructor(x,y,x2,y2) {
        super(x,y)
        this.#x2 = x2
        this.#y2 = y2
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this._x,this._y)
        ctx.lineTo(this.#x2,this.#y2)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this._color
        ctx.stroke()
    }
}