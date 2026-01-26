// usePhysics.ts
import Matter from "matter-js"

const SIZE = 50
const COUNT = 200
const CURSOR_RADIUS = 70      // smaller radius for cursor influence
const FORCE_MULTIPLIER = 0.005 // slightly stronger since radius is smaller

// Generate a random color that looks good on dark backgrounds
function getRandomColor() {
  const hue = Math.random() * 360
  const saturation = 60 + Math.random() * 20 // 60-80%
  const lightness = 50 + Math.random() * 10  // 50-60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export function initPhysics(container: HTMLDivElement) {
  const { Engine, World, Bodies, Body, Runner } = Matter

  // Engine
  const engine = Engine.create()
  engine.gravity.y = 0.3

  // Canvas
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  container.appendChild(canvas)

  const resize = () => {
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
  }
  resize()
  window.addEventListener("resize", resize)

  // Create bodies with persistent colors
  const bodies: { body: Matter.Body; type: "circle" | "rect" | "triangle"; color: string }[] = []

  for (let i = 0; i < COUNT; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const type = i % 3 === 0 ? "circle" : i % 3 === 1 ? "rect" : "triangle"

    let body: Matter.Body
    if (type === "circle") body = Bodies.circle(x, y, SIZE / 2)
    else if (type === "rect") body = Bodies.rectangle(x, y, SIZE, SIZE)
    else body = Bodies.polygon(x, y, 3, SIZE / 2)

    Body.set(body, { restitution: 0.8, frictionAir: 0.01 })
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 })

    bodies.push({ body, type, color: getRandomColor() })
    World.add(engine.world, body)
  }

  // Add walls
  World.add(engine.world, [
    Bodies.rectangle(canvas.width / 2, -50, canvas.width, 100, { isStatic: true }),
    Bodies.rectangle(canvas.width / 2, canvas.height + 50, canvas.width, 100, { isStatic: true }),
    Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, { isStatic: true }),
    Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, { isStatic: true }),
  ])

  // Mouse tracking
  let mouseX = 0
  let mouseY = 0
  container.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })

  // Runner
  const runner = Runner.create()
  Runner.run(runner, engine)

  // Draw loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    bodies.forEach(({ body, type, color }) => {
      const dx = body.position.x - mouseX
      const dy = body.position.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Apply cursor force only if within reduced radius
      if (dist < CURSOR_RADIUS) {
        const force = (1 - dist / CURSOR_RADIUS) * FORCE_MULTIPLIER
        Body.applyForce(body, body.position, { x: dx * force, y: dy * force })
      }

      // Draw shapes
      ctx.save()
      ctx.translate(body.position.x, body.position.y)
      ctx.rotate(body.angle)
      ctx.fillStyle = color
    //   ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2

      if (type === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, SIZE / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else if (type === "rect") {
        ctx.fillRect(-SIZE / 2, -SIZE / 2, SIZE, SIZE)
        ctx.strokeRect(-SIZE / 2, -SIZE / 2, SIZE, SIZE)
      } else {
        ctx.beginPath()
        ctx.moveTo(0, -SIZE / 2)
        ctx.lineTo(SIZE / 2, SIZE / 2)
        ctx.lineTo(-SIZE / 2, SIZE / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    })

    requestAnimationFrame(animate)
  }

  animate()

  // Cleanup function
  return () => {
    window.removeEventListener("resize", resize)
    container.removeChild(canvas)
    World.clear(engine.world, false)
    Engine.clear(engine)
  }
}
