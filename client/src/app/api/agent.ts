import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5099/api/';

const responseBody = (res: AxiosResponse) => res.data;

axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async response => {
  await sleep();
  const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
  return response;
}, (error: AxiosError) => {
  const { data, status } = error?.response as AxiosResponse;
  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key]);
          }
        }
        throw modelStateErrors.flat();
      }
      toast.error(data.title);

      break;
    case 401:
      toast.error(data.title);
      break;
    case 403:
      toast.error("you are not allowed to do that!");
      break;
    case 500:
      router.navigate('/server-error', { state: { error: data } });
      break;
    default:
      break;
  }
  return Promise.reject(error?.response);
});

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key])
  }
  return formData;
}

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, {
    headers: {'Content-Type':'multipart/form-data'}
  }).then(responseBody),

  putForm: (url: string, data: FormData) => axios.put(url, data, {
    headers: {'Content-Type': 'multipart/form-data'}
  }).then(responseBody)
}

const Post = {
  list: (params: URLSearchParams) => requests.get('Post', params),
  details: (id: number) => requests.get(`Post/${id}`)
};

const Account = {
  login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser')
}

const Admin = {
  createPost: (post: any) => requests.postForm('Post', createFormData(post)),
  updatePost: (post: any) => requests.putForm('Post', createFormData(post)),
  deletePost: (id:number) => requests.del(`Post/${id}`)
}


const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorised'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error')
}

const agent = { Post, TestErrors, Account, Admin}

export default agent