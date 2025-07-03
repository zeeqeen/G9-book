#let idea(body) = {
  set page(height: auto, fill: none)
  set text(fill: white, font: ("Roboto Serif", "Noto Serif SC"))
  show table.cell.where(x: 0): set text(weight: "bold", font: "Noto Sans SC")
  body
}

#let idea-table(content) = table(
  columns: content.first().len(),
  stroke: none,
  fill: (x, _) => if calc.odd(x) { blue.lighten(10%) },
  ..content.flatten()
)
