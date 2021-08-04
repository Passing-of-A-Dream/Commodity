import { ref } from "vue";

interface User {
  address: string;
  password: string;
}

export const loginFood = ref<User>({
  address: '',
  password: "",
})

interface rules {
  address: {
    required: boolean;
    message: string;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
  })[];
}

export const rules = ref<rules>({
  address: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message:"密码不能为空", trigger: 'blur' },
    { min: 6, max: 16, message:"密码长度在6至16位之间" }
  ]
})