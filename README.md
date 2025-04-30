# qualtrics-car-make-model

A react-based component that displays a drag-selectable matrix question on [Qualtrics](https://www.qualtrics.com).

## Features

- A matrix question that users can select multiple answers at once by dragging the pointer.
- Can work with mobile devices (with some restrictions, please see below).

---

![Example](example.gif)

---

# Installation

## Header Settings

1. In the survey edit screen, click "Look & Feel" on the top-right.
1. Select the "General" tab and then edit the "Header".
1. Click the "<>" icon to enter the coding view.
1. Copy and paste the following code.

```javascript
<script src="https://cdn.jsdelivr.net/gh/keita-makino/qualtrics-drag-matrix@0.3.1/dist/bundle.js"></script>
```

## Use It

1. The question type has to be set to "Matrix table" + "Likert" + "Allow multiple answers".
1. Click the question text and click "Rich Content Editor...".
1. Click the {A} button at the top-left and click "Survey Question".
1. Search this question and click "Question Text".
1. A code `${q://"Some ID"/QuestionText}` will be inserted so save the ID for later use.
1. Edit the text fields on the rows/columns as you need.
1. Select the "JavaScript" option from the side menu or click </> icon next to the question text to enter the coding view.
1. Copy and paste the code below.
1. **All done!**

```javascript
Qualtrics.SurveyEngine.addOnload(function () {
  /*Place your JavaScript here to run when the page loads*/
});

Qualtrics.SurveyEngine.addOnReady(function () {
  dragMatrixRender(
    document.getElementById(
      "The question ID, make sure the ID is surrounded by the double-quotation"
    )
  );
});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/
});
```

# Limitation on Mobile

Due to the width limitation on mobile phones, it may not work if either

1. You have many columns (basically at most 4 columns are recommended).
2. You use a long text on the row/column text.
