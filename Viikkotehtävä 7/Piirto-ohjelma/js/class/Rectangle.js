import { Shape } from "./Shape.js"

export class Rectangle extends Shape{
    #width
    #height

    constructor(x,y,width,height) {
        super(x,y)
        this.#width = width
        this.#height = height
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this._x, this._y, this.#width, this.#height)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this._color
        ctx.stroke()
    }
}