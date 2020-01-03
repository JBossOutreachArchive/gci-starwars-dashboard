const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'ReactService' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/ReactService.js`;

      if (isLocalhost) {
        checkValidReactService(swUrl, config);
        navigator.ReactService.ready.then(() => {
          console.log(
            'webapp is running'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.ReactService
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const rservice = registration.installing;
        if (rservice == null) {
          return;
        }
        rservice.onstatechange = () => {
          if (rservice.state === 'installed') {
            if (navigator.ReactService.controller) {
              console.log(
                'Test in console'
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error in ReactService:', error);
    });
}

function checkValidReactService(swUrl, config) {
  fetch(swUrl, {
    headers: { 'ReactService': 'script' }
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.ReactService.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'App not working'
      );
    });
}

export function unregister() {
  if ('ReactService' in navigator) {
    navigator.ReactService.ready.then(registration => {
      registration.unregister();
    });
  }
}
