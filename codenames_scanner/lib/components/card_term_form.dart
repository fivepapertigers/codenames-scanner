import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class UpperCaseFormatter implements TextInputFormatter {
  TextEditingValue formatEditUpdate(TextEditingValue oldVal, TextEditingValue newVal) =>
    newVal.copyWith(text: newVal.text.toUpperCase());
}


class CardTermForm extends StatelessWidget {

  final Function(String) onSubmit;
  final String term;

  CardTermForm({this.onSubmit, this.term});

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: new Form(
        child: new TextFormField(
          decoration: new InputDecoration(
            labelText: 'Manually edit card term:'
          ),
          onFieldSubmitted: onSubmit,
          initialValue: term == null ? '' : term,
          inputFormatters: [
            new UpperCaseFormatter()
          ],

        )
      )
    );
  }
}
