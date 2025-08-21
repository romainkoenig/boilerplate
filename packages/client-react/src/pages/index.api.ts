import privateBackendApi from '@/shared/apis/privateBackend.api';
import publicBackendApi from '@/shared/apis/publicBackend.api';

async function helloWorldPublic() {
  const { data } = await publicBackendApi({
    url: `/api/`
  });

  return data;
}

async function helloWorldPrivate(token: string) {
  const { data } = await privateBackendApi({
    url: `/api/private`,
    token,
  });

  return data;
}

export { helloWorldPublic, helloWorldPrivate };