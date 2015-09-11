/**
 * Created by Administrator on 2015/8/16.
 */
renderMathInElement(document.body,
	{
		delimiters: [
			{left: "$$", right: "$$", display: true},
			{left: "\\[", right: "\\]", display: true},
			{left: "$", right: "$", display: false},
			{left: "\\(", right: "\\)", display: false}
		]
	}
);
