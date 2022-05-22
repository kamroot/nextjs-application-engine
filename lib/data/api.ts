import { log } from '~/lib/functions/log';
import { url } from 'lib/functions/utils';
import HTTP_RESPONSE from 'lib/data/http_codes';

export async function addSubscriber(logEvent: any, userName: string, userEmail: string) {
  const eventCategory = 'Newsletter Subscribe';
  logEvent({ category: eventCategory, action: 'Subscribe-submit' });

  const urlHost = url('/api/subscribe');
  await fetch(urlHost, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: userName, email: userEmail }),
  }).then(async (response) => {
    const text = await response.text();
    log('SUBSCRIBE API', `status - ${response.status} and text - ${text}`);
    logEvent({
      category: eventCategory,
      action: response.status === HTTP_RESPONSE.OK ? 'OK (subscription)' : 'FAIL (subscription)',
      label: response.status,
      value: text,
    });
  });
}

// send all the data to the server so it can generate a PDF
export const sendFormData = async (html, formjson, data) => {
  // console.log('sendata', data);
  // const eventCategory = `Send Form Data ${formjson.formName}`;
  // logEvent({ category: eventCategory, action: 'submit' });

  const urlHost = url('/api/submit-form-data');
  await fetch(urlHost, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html: html, formDetails: formjson, formData: data }),
  }).then(async (response) => {
    const text = await response.text();
    log('SUBMIT FORM DATA API', `status - ${response.status} and text - ${text}`);
  });
};
