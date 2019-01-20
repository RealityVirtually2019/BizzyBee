<template>
  <div class="build">
    <h1 class="title" @click="quickDemo">BizzyBee</h1>
    <el-form label-width="120px" class="form" size="mini">
      <h2>Host</h2>
      <el-form-item label="Your Name">
        <el-input v-model="hostName" placeholder="Who are you"></el-input>
      </el-form-item>
      <el-form-item label="Your Email">
        <el-input
          v-model="hostEmail"
          type="email"
          placeholder="Your Email"
        ></el-input>
      </el-form-item>
      <h2>Deliver to</h2>
      <el-form-item label="Name">
        <el-input
          v-model="name"
          placeholder="Who you wanna deliver to"
        ></el-input>
      </el-form-item>
      <el-form-item label="Card Message">
        <el-input
          v-model="desc"
          type="textarea"
          :rows="1"
          placeholder="for someone or for some reason"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Deliver On">
        <el-date-picker
          v-model="sendItAt"
          align="right"
          type="date"
          placeholder="What date do you want to send it to ....."
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Address">
        <el-input
          v-model="address"
          type="textarea"
          :rows="2"
          placeholder="We will send the Card to...."
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :disabled="ready" class="btnBuild" @click="build">
        Build
      </el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/services/firebase'

const sendDatePickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: 'Next Week',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      },
    },
    {
      text: 'Two Weeks',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() + 2 * 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      },
    },
  ],
}

export default {
  name: 'Build',
  data() {
    return {
      hostName: '',
      hostEmail: '',
      name: '',
      desc: '',
      sendItAt: '',
      address: '',
      email: '',
      sendDatePickerOptions,
    }
  },
  computed: {
    ready() {
      return !this.sendItAt || !this.hostName || !this.name
    },
  },
  methods: {
    quickDemo() {
      this.hostName = 'Brica Hrica'
      this.hostEmail = 'BHrica@AZCErica.com.tw'
      this.name = 'Arica Zrica'
      this.desc = `Aunt Lori Fainted And Broke Her Wrist. She Will Have To Be In The Hospital For 6 Days While Dr.s Run Tests. Join us!`
      this.sendItAt = '2019-01-29T00:00:00.000Z'
      this.address = 'MSG Hospital Room 75351'
    },
    build() {
      const gardenRef = db.ref('gardens').push()
      const gardenKey = gardenRef.key
      const linksRef = db.ref('links').push(gardenKey)
      const linkKey = linksRef.key

      const data = {
        name: this.name,
        desc: this.desc,
        sendItAt: this.sendItAt,
        address: this.address,
        email: this.email,
        linkKey,
      }

      gardenRef.update(data).then(() => {
        console.log('Garden has been built!')
        this.$router.push(`/gardener/${gardenKey}`)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.build {
  // text-align: center;
}

.title {
  text-align: center;
  font-size: 64px;
  margin: 5px 0px;
}

.form {
  margin-right: 20px;

  h2 {
    margin-left: 10px;
    border-bottom: 1px solid black;
  }
}

.btns {
  text-align: center;
}

.btnBuild {
  margin-left: 10px;
}
</style>
