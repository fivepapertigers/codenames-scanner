import 'package:flutter/material.dart';
import 'package:codenames_scanner/containers/edit_card_container.dart';
import '_base_page.dart';
import 'package:codenames_scanner/components/card_term_form.dart';

class EditCardPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new BasePage(
      scrollable: true,
      child: new EditCardContainer(
        (BuildContext context, vm) {
          if (vm.card == null) {
            return new Text('Loading...');
          } else {
            return new Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                new Center(
                  child: new SizedBox(
                    child: new Image.file(vm.card.image.file),
                    width: 200.0,
                  ),
                ),
                new CardTermForm(
                  onSubmit: vm.updateCardTerm,
                  term: vm.card.termResult.term
                ),
              ]
            );
          }
        }
      )
    );

  }

}
