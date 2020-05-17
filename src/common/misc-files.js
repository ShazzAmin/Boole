export default [
	{
		name: "scratchpad.grg",
		contents: `#u name
#a 00

#q 00

#check PROP

a => b`,
	},
	{
		name: "nd_example.grg",
		contents: `#u name
#a 00
#q 00

#check ND

p => !q, r => q |- p => !r

1) p => !q premise
2) r => q premise
3) assume p {
	4) !q by imp_e on 1, 3
	5) !r by imp_e on 2, 4
}
6) p => !r by imp_i on 3-5`,
	}
];