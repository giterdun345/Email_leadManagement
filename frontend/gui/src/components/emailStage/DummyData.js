// DUMMY DATA PROPAGATION 
const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i,
    name: `Edward Coliglio ${i}`,
    company: 'Robert Half',
    category: 'Angel',
    email: `angelInvestor@angelInvestor.com`,
    
  });
}

originData.push({
  key: 4,
  name: `Steven Zimba`,
  company: 'George and Associates',
  category: 'VC',
  email: `vcCompany@vcCompany.com`,
})

export default originData