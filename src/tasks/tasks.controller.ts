import { Body, Controller, HttpCode, HttpStatus, Get, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard";

@Controller('api/tasks')
export class TasksController {

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  getAllTasks() {
    return { 
      header: [
        {
          label: 'Номер',
          name: 'id',
          style: 'width: 100px;'
        },
        {
          label: 'Название',
          name: 'title',
          style: 'width: 175px;'
        },
        {
          label: 'Описание',
          name: 'description',
          style: 'width: 250px;'
        },
        {
          label: 'Время',
          name: 'time',
          style: 'width: 200px;'
        },
        {
          label: 'Приоритет',
          name: 'priority',
          style: 'width: 140px;'
        },
        {
          label: 'Файлы',
          name: 'attachments',
          style: 'width: 100px;'
        },
        {
          label: 'Доска',
          name: 'board',
          style: 'width: 140px;'
        },
        {
          label: 'Проект',
          name: 'project',
          style: 'width: 140px;'
        },
        {
          label: 'Создатель',
          name: 'creator',
          style: 'width: 250px;'
        },
      ], 
      items: [
        {
          id: 1,
          parts: [
            {
              label: '#234',
              outerStyle: 'width: 100px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'badge badge-secondary'
            },
            {
              label: 'Заголовок задачи',
              outerStyle: 'width: 175px;',
              innerStyle: 'font-weight: bold; text-decoration: underline;',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: 'Описание задачи небольшое, но может быть и больше чем нужно',
              outerStyle: 'width: 250px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: '12 часов из 24 часов',
              outerStyle: 'width: 200px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis',
              iconPrepend: 'time',
            },
            {
              label: 'Важно',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'badge badge-success'
            },
            {
              label: '4',
              iconAppend: 'attachment',
              outerStyle: 'width: 100px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: 'Основная доска',
              url: '/boards/1',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link'
            },
            {
              label: 'Основной проект',
              url: '/projects/1',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link'
            },
            {
              url: '/users/1',
              img: '@/assets/icons/logo.svg',
              outerStyle: 'width: 250px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link',
              label: 'Иванов Иван Иванович'
            },
          ]
        },
        {
          id: 2,
          parts: [
            {
              label: '#234',
              outerStyle: 'width: 100px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'badge badge-secondary'
            },
            {
              label: 'Заголовок задачи',
              outerStyle: 'width: 175px;',
              innerStyle: 'font-weight: bold; text-decoration: underline;',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: 'Описание задачи небольшое, но может быть и больше чем нужно',
              outerStyle: 'width: 250px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: '12 часов из 24 часов',
              outerStyle: 'width: 200px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis',
              iconPrepend: 'time',
            },
            {
              label: 'Важно',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'badge badge-success'
            },
            {
              label: '4',
              iconAppend: 'attachment',
              outerStyle: 'width: 100px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'text-primary text-ellipsis'
            },
            {
              label: 'Основная доска',
              url: '/boards/1',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link'
            },
            {
              label: 'Основной проект',
              url: '/projects/1',
              outerStyle: 'width: 140px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link'
            },
            {
              url: '/users/1',
              img: '@/assets/icons/logo.svg',
              outerStyle: 'width: 250px;',
              innerStyle: '',
              outerClass: '',
              innerClass: 'link',
              label: 'Иванов Иван Иванович'
            },
          ]
        }
      ], 
      count: 1,
      sort: {
        name: 'creator',
        direction: 'up'
      } 
    }
  }
}