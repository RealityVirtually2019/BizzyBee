<template>
  <div class="build">
    <Banner text="Recipient Info" />

    <el-form label-width="120px" class="form" size="mini" label-position="top">
      <h2 class="formTitle" @click="quickDemo">Host</h2>
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
      <h2 class="formTitle">Send to</h2>
      <el-form-item label="Name">
        <el-input v-model="name" placeholder="Full name"></el-input>
      </el-form-item>

      <el-form-item label="Deliver On">
        <el-date-picker
          v-model="sendItAt"
          align="right"
          type="date"
          placeholder="What date do you want to deliver on ....."
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Address">
        <el-input
          v-model="address"
          type="textarea"
          :rows="2"
          placeholder="The Card will be sent to ...."
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Card Message">
        <el-input
          v-model="desc"
          type="textarea"
          :rows="5"
          placeholder="Card message printed"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button
        :disabled="ready"
        class="btn btnBuild"
        round
        size="small"
        @click="() => (showPayment = true)"
      >
        Next
      </el-button>
    </div>

    <el-dialog
      title="Payment Information"
      :visible.sync="showPayment"
      class="paymentInfo"
    >
      <el-form
        class="form"
        :model="payment"
        label-width="120px"
        size="mini"
        label-position="top"
      >
        <el-form-item label="Cardholder name">
          <el-input
            v-model="payment.name"
            placeholder="Cardholder Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Card number">
          <el-row>
            <el-input
              v-model="payment.number"
              placeholder="Card Number"
              type="number"
            ></el-input>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-input
                v-model="payment.exp"
                placeholder="Exp (MM/YY)"
                type="number"
              ></el-input>
            </el-col>
            <el-col :span="1"> <p></p></el-col>
            <el-col :span="9">
              <el-input
                v-model="payment.cvc"
                placeholder="Security Code"
                type="number"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="amount">
          <label>total</label>
          $5.99
        </span>
        <el-button
          class="btn"
          size="mini"
          round
          @click="() => (showPayment = false)"
        >
          Back
        </el-button>
        <el-button class="btn" size="mini" round @click="build">
          Submit
        </el-button>
      </div>
    </el-dialog>
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
      payment: {},
      showPayment: false,
    }
  },
  computed: {
    ready() {
      return !this.sendItAt || !this.hostName || !this.name
    },
  },
  created() {
    // this.quickDemo()
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
  margin: 20px;

  h2 {
    margin-bottom: 0.4em;
    margin-top: 1em;
    margin-left: -5px;
    border-bottom: 1px solid black;
  }

  /deep/ {
    input,
    textarea {
      background-color: #fafafa;
      border-radius: 0px;

      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.04em;
      // color: $normal;
      font-weight: 400;
      font-style: normal;
    }

    .el-form-item--mini.el-form-item {
      margin: 0.1em 0px;
    }

    .el-form-item__label {
      padding: 0px;
      margin-bottom: -1px;

      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.04em;
      color: $normal;
      font-weight: 400;
      font-style: normal;
    }

    .el-date-editor.el-input {
      width: 100%;
    }
  }
}

.btns {
  text-align: right;
  margin: 20px;
}

.btnBuild {
  // margin-left: 10px;
}

.paymentInfo {
  /deep/ {
    .el-dialog__body {
      padding: 0px 20px;
      padding-bottom: 15px;
    }

    .el-dialog {
      width: 90%;
    }

    .el-form {
      margin: 0px;
    }

    .el-form-item--mini.el-form-item {
      margin-top: 0.6em;
    }

    input {
      margin-top: 0.6em;
    }
  }

  .amount {
    margin-right: 20px;
    text-align: left;
    padding: 5px;
    background-color: #fcd651;

    vertical-align: middle;
    font-size: 16px;

    label {
      font-size: 10px;
    }
  }
}
</style>
