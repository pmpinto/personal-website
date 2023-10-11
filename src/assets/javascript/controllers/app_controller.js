import { Controller } from '@hotwired/stimulus'

export default class AppController extends Controller {
  static targets = ['navigation', 'footer']

  connect() {
    // this.setAnalyticsEvents()

    this.toggleNav = this.toggleNav.bind(this)
  }

  toggleNav(entry) {
    this.navigationTarget.classList.toggle('is-hidden', entry.isIntersecting)
  }

  setAnalyticsEvents() {
    if (!window.gtag) return

    const elements = document.querySelectorAll('[data-event-category]')

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const category = element.getAttribute('data-event-category')
        const label = element.getAttribute('data-event-label')

        window.gtag('event', 'click', {
          'event_category': category,
          'event_label': label
        })
      })
    })
  }
}
