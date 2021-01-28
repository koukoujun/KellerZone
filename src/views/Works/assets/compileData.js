export default {
  name: {title:'个人简介', name: 'name',value:'',label: '姓名', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '姓名', errorMsg: "请填写正确的", showMsg: '请填写' },
  sex: { name: 'sex',value:'', label: '性别', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'select', type: 'select', maxlength: '', msg: '性别', errorMsg: "请选择正确的", showMsg: '请选择' },
  job: { name: 'job', value:'',label: '职业', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '职业', errorMsg: "请填写正确的", showMsg: '请填写' },
  phone: { name: 'phone', value:'',label: '联系电话', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'tel', maxlength: '', msg: '联系电话', errorMsg: "请填写正确的", showMsg: '请填写' },
  qq: { name: 'qq', value:'',label: 'QQ号码', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'tel', maxlength: '', msg: 'QQ号码', errorMsg: "请填写正确的", showMsg: '请填写' },
  email: { name: 'email', value:'',label: '邮箱地址', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'tel', maxlength: '', msg: '邮箱地址', errorMsg: "请填写正确的", showMsg: '请填写' },
  wx: { name: 'wx', value:'',label: '微信号码', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'tel', maxlength: '', msg: '微信号码', errorMsg: "请填写正确的", showMsg: '请填写' },
  expJob: {title:'职业意向', name: 'expJob', value:'',label: '期望职业', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '期望职业', errorMsg: "请填写正确的", showMsg: '请填写' },
  livePlace: {name: 'livePlace', value:'',label: '居住地', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '居住地', errorMsg: "请填写正确的", showMsg: '请填写' },
  expIncome: {name: 'liveIncome', value:'',label: '期望薪资', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '期望薪资', errorMsg: "请填写正确的", showMsg: '请填写' },
  skill: {title:'技能',name: 'skill', value:'',label: '技能', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '技能', errorMsg: "请填写", showMsg: '请填写' },
  interest: {title:'兴趣爱好',name: 'interest', value:'',label: '兴趣爱好', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: 'text', maxlength: '', msg: '兴趣爱好', errorMsg: "请填写", showMsg: '请填写' },
  myIntroduce: {title:'自我介绍',name: 'myIntroduce', value:'',label: '自我介绍', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'textarea', type: '', maxlength: '', msg: '自我介绍', errorMsg: "请填写", showMsg: '请填写' },
  jobExp:[
    {
      name:{title:'工作经历',name: 'name', value:'',label: '工作地点', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '工作地点', errorMsg: "请填写", showMsg: '请填写' },
      content:{name: 'content', value:'',label: '工作内容', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'textarea', type: '', maxlength: '', msg: '工作内容', errorMsg: "请填写", showMsg: '请填写' },
      start_time:{name: 'start_time', value:'',label: '开始时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '开始时间', errorMsg: "请填写", showMsg: '请填写' },
      end_time:{name: 'end_time', value:'',label: '结束时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '结束时间', errorMsg: "请填写", showMsg: '请填写' },
    }
  ],
  projectExp:[
    {
      name:{title:'项目经历',name: 'name', value:'',label: '工作地点', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '工作地点', errorMsg: "请填写", showMsg: '请填写' },
      title:{name: 'title', value:'',label: '项目名称', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '项目名称', errorMsg: "请填写", showMsg: '请填写' },
      content:{name: 'content', value:'',label: '项目内容', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'textarea', type: '', maxlength: '', msg: '项目内容', errorMsg: "请填写", showMsg: '请填写' },
      start_time:{name: 'start_time', value:'',label: '开始时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '开始时间', errorMsg: "请填写", showMsg: '请填写' },
      end_time:{name: 'end_time', value:'',label: '结束时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '结束时间', errorMsg: "请填写", showMsg: '请填写' },
    }
  ]
}