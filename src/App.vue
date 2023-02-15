<template>
  <div id="app">
    <header>
    <h1>A daily Task Manager webApp</h1>
    <p>small simple project by Lana Alzbibi for RiseUp</p>
  </header>
  <table>
      <tr>
        <th>USER ID</th>
        <th>title</th>
        <th>due_on</th>
        <th>status</th>
        <th>delete</th>
        <th>edit</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.user_id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.due_on }}</td>
        <td>{{ item.status }}</td>
        <td><button class="btn btn-danger" @click="remove(item.id)">Delete</button></td>
        <td> 
          <button class="btn btn-info"  @click="showModal= true">update</button>
          <modal v-if="showModal" @close="showModal = false">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="title"  class="form-control" placeholder="Todo title">
              </div>
              <div class="form-group">
                <label for="status">due on</label>
                <input type="text" v-model="dueOn"  class="form-control"placeholder="due On">
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <input type="text" v-model="status" class="form-control"placeholder="Status (pending or completed)">
              </div>
              <div class="form-group">
                <button class="btn btn-info" @click="edit(item.id)">update</button>
                <button class="btn btn-danger" @click="closeModal">cancle</button>
              </div>
            </form>
          </modal>
       </td>
      </tr>
    </tbody>
  </table>
  <div>
      

      </div>
      <div class="add-Task">
      <h1>Add a new Task</h1>
      <form id="createForm" @submit="createNew">
          <input type="text" v-model="userId" placeholder="existing ! User ID:">
          <input type="text" v-model="title" placeholder="Todo title">
          <input type="text" v-model="dueOn" placeholder="due On">
          <input type="text" v-model="status" placeholder="Status (pending or completed)">
          <button id="create" class="btn btn-dark" type="submit">Create</button>
        </form>
      </div>
    </div>
</div>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      showModal: false,
      items: [],
      userId: '',
      title: '',
      dueOn: '',
      status: ''
    }
  },
  mounted () {
    this.getItems()
  },
  methods: {
    async getItems () {
      try {
        const response = await axios.get('https://gorest.co.in/public-api/todos', {
          headers: {
            'Authorization': 'Bearer efc9819c12f08d8264fd6382ed54e8b972b456eb7bcc262df75b6b7910c618d5'
          }
        })
        this.items = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async remove (itemId) {
      try {
        let confirm = window.confirm('are you SURE you want to delete this task?')
        if (confirm) {
          await axios.delete(`https://gorest.co.in/public-api/todos/${itemId}`, {
            headers: {
              'Authorization': 'Bearer efc9819c12f08d8264fd6382ed54e8b972b456eb7bcc262df75b6b7910c618d5'
            }
          })
          alert('task deleted!')
        }
        this.getItems()
      } catch (error) {
        console.error(error)
      }
    },
    async createNew () {
      try {
        const response = await axios.post('https://gorest.co.in/public-api/todos?access-token=efc9819c12f08d8264fd6382ed54e8b972b456eb7bcc262df75b6b7910c618d5', {
          user_id: this.userId,
          due_on: this.dueOn,
          title: this.title,
          status: this.status
        }, {
          headers: {
            Authorization: 'Bearer efc9819c12f08d8264fd6382ed54e8b972b456eb7bcc262df75b6b7910c618d5'
          }
        })
        alert('task created!')
        this.getItems()
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async edit (itemId) {
      try {
        let confirm = window.confirm('are you SURE you want to edit this task?')
        if (confirm) {
          const response = await axios.put(`https://gorest.co.in/public-api/todos/${itemId}`, {
            due_on: this.dueOn,
            title: this.title,
            status: this.status
          }, {
            headers: {
              'Authorization': 'Bearer efc9819c12f08d8264fd6382ed54e8b972b456eb7bcc262df75b6b7910c618d5'
            }
          })
          this.getItems()
          console.log(response.data)
          this.showModal = false
        }
      } catch (error) {
        console.error(error)
      }
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css');
  #app {
    width: 80%;
    margin: 0 auto;
    padding-top: 20px;
  }
  header{ 
    display: grid;
    place-items: center;
  }

  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 8px;
  }

  th {
    color:white;
    background-color: #20229C;

  }

  tr:nth-child(even) {
    background-color: #ddd;
  }
  #createForm {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: auto;
}

label {
  font-weight: bold;
  margin-top: 10px;
  display: block;
}
input{
  width: 100%; 
}
#create{
  margin-top: 20px;
}
</style>