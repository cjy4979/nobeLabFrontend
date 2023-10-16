import { defineConfig } from '@umijs/max';
// import userLayout from '@/components/userLayout'
// import adminLayout from '@/components/adminLayout'

export default {
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
    title: true
  },
  layout: {
    title: 'NOBELAB',
    locale: true,

  },
  routes: [
    {
      path: '/',
      redirect: '/visit/home',
      title: 'title.index'
    },
    {
      path: '/visit',
      //layout: userLayout,
      routes: [
        {
          path: '/visit',
          redirect: '/visit/home',
          title: 'title.index'
        },
        {
          //name: '首页',
          path: '/visit/home',
          component: './visit/Home',
          title: 'title.home'
        },
        {
          //name: '实验室介绍',
          path: '/visit/intro',
          component: './visit/intro',
          title: 'title.intro'
        }, {
          path: '/visit/news',
          component: './visit/news',
          title: 'title.news'
        },
        {
          path: '/visit/newsDetail',
          component: './visit/news/newsDetail',
        },
        {
          path: '/visit/joinus',
          component: './visit/joinus'
        },
        {
          path: '/visit/instrument',
          component: './visit/instrument'
        },
        {
          //name: '科研团队',
          path: '/visit/team',
          title: 'title.team',
          routes: [
            {
              path: '/visit/team',
              redirect: '/visit/team/teachers'
            },
            {
              path: '/visit/team/teachers',
              component: './visit/team/teachers'
            },
            {
              path: '/visit/team/teacherDetail',
              component: './visit/team/teachers/teacherDetail'
            },
            {
              path: '/visit/team/students',
              component: './visit/team/students'
            },
            {
              path: '/visit/team/graduated',
              component: './visit/team/graduated'
            },
          ]
        },
      ],
    },
    {
      path: '/login',
      component: './login',
      layout: false
    },
    {
      path: '/admin',
      //layout: false,
      wrapper: ['@/wrappers/auth'],
      routes: [
        {
          path: '/admin',
          redirect: '/admin/home'
        },
        {
          path: '/admin/home',
          component: './admin/home',
        },
        {
          path: '/admin/intro',
          component: './admin/intro'
        },
        {
          path: '/admin/news',
          component: './admin/news',
        },
        {
          path: '/admin/addnews',
          component: './admin/news/addNews'
        },
        {
          path: '/admin/newsDetail',
          component: './admin/news/newsDetail'
        },
        {
          path: '/admin/team',
          routes:
            [
              {
                path: '/admin/team',
                redirect: '/admin/team/teachers'
              },
              {
                path: '/admin/team/teachers',
                component: './admin/team/teacherTeam'
              },
              {
                path: '/admin/team/students',
                component: './admin/team/studentTeam'
              },
              {
                path: '/admin/team/graduated',
                component: './admin/team/graduatedTeam'
              },
              {
                path: '/admin/team/addteacher',
                component: './admin/team/teacherTeam/addTeacher'
              },
              {
                path: '/admin/team/teacherDetail',
                component: './admin/team/teacherTeam/teacherDetail'
              },
            ]
        },
        {
          path: '/admin/instrument',
          component: './admin/instrument'
        },
        {
          path: '/admin/joinus',
          component: './admin/joinus'
        }
      ]
    }
  ],
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:8088/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    }
  },
  npmClient: 'yarn',
};

