<template>
  <div class="build">
    <el-form label-width="80px">
      <el-form-item label="Name">
        <el-input v-model="name" placeholder="Who"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="desc"
          type="textarea"
          :rows="2"
          placeholder="What's this for someone for some reason"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Address">
        <el-input
          v-model="address"
          type="textarea"
          :rows="2"
          placeholder="We will send a Card to...."
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Send It">
        <el-date-picker
          v-model="sendItAt"
          align="right"
          type="date"
          placeholder="What date do you want to send it to ....."
          :picker-options="sendDatePickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Your Email">
        <el-input
          v-model="email"
          type="email"
          placeholder="Input your Email"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="build">Build</el-button>
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
      name: '123',
      desc: '123',
      sendItAt: '123',
      address: '123',
      email: '123',
      sendDatePickerOptions,
    }
  },
  methods: {
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
      })
    },
  },
}
</script>
