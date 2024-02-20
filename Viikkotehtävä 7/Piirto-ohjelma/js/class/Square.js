import { Rectangle } from "./Rectangle.js"

export class Square extends Rectangle{
    #width
    #height

    constructor(x,y,width) {
        super(x,y)
        this.#width = width
        this.#height = width
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this._x, this._y, this.#width, this.#height)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this._color
        ctx.stroke()
    }
}