import wrapWithProviders from "./wrapWithProviders"

export const wrapRootElement = wrapWithProviders

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Questa applicazione si è aggiornata. ` +
    `Ricarica per mostrare la nuova versione?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

