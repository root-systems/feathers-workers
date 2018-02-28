var config = window.clientconfig

console.log('config', config)

var trigger = document.createElement('button')
trigger.textContent = 'trigger!'
trigger.onclick = (ev) => {
  console.log('click!')
}
document.body.appendChild(trigger)

